<?php
namespace src\module\payment\repository;

use src\infrastructure\Repository;
use src\module\order\factory\DiscountOrderFactory;
use src\module\payment\objects\Payment;
use tools\infrastructure\Collector;

class PaymentRepository extends Repository{
    protected DiscountOrderFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new DiscountOrderFactory();
    }

    public function create(Payment $payment):void{
        $this->insert('payment')
            ->column('id', $this->uuid($payment->id()))
            ->column('orderId', $this->uuid($payment->orderId()))
            ->column('amount', $payment->amount())
            ->column('created', $payment->created())
            ->column('status', $payment->status())
            ->column('email', $payment->email())
            ->column('posReference', $payment->posReference());
        $this->execute();
    }
    
    public function edit(Payment $payment):void{
        $this->update('payment')
            ->column('orderId', $this->uuid($payment->orderId()))
            ->column('amount', $payment->amount())
            ->column('created', $payment->created())
            ->column('status', $payment->status())
            ->column('email', $payment->email())
            ->column('posReference', $payment->posReference())
            ->where()->eq('id', $this->uuid($payment->id()));
        $this->execute();
    }
    
    public function listPayments(array $where=[]):Collector{
        $this->select('payment');

        if(isset($where['id'])){
            $this->where()->eq('id', $this->uuid($where['id']));
        }
        if(isset($where['orderId'])){
            $this->where()->eq('orderId', $this->uuid($where['orderId']));
        }
        if(isset($where['status'])){
            $this->where()->eq('status', $where['status']);
        }
        $this->pagination()->set($this->request()->pagination()->get());
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}