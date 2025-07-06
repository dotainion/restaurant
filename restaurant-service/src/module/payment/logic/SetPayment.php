<?php
namespace src\module\payment\logic;

use src\module\payment\objects\Payment;
use src\module\payment\repository\PaymentRepository;

class SetPayment{
    protected PaymentRepository $repo;

    public function __construct(){
        $this->repo = new PaymentRepository();
    }

    public function set(Payment $payment):void{
        $collector = $this->repo->listPayments([
            'id' => $payment->id()
        ]);
        if($collector->isEmpty()){
            $this->repo->create($payment);
            return;
        }
        $this->repo->edit($payment);
    }
}