<?php
namespace src\module\payment\service;

use src\infrastructure\Service;
use src\module\payment\factory\PaymentFactory;
use src\module\payment\logic\SetPayment;
use src\module\order\logic\ListOrders;
use src\module\order\objects\Order;
use src\module\order\service\SetOrderService;
use src\module\payment\objects\PaymentStatus;
use tools\infrastructure\Assert;
use tools\infrastructure\DateHelper;
use tools\infrastructure\Id;

class CreatePaymentService extends Service{
    protected PaymentFactory $factory;
    protected ListOrders $order;
    protected SetPayment $payment;

    public function __construct(){
        parent::__construct();
        $this->factory = new PaymentFactory();
        $this->order = new ListOrders();
        $this->payment = new SetPayment();
    }
    
    public function process($orderId, $email, $posReference){
        Assert::validUuid($orderId, 'Order not found.');

        $collector = $this->order->byId(new Id($orderId));
        $order = $collector->first();

        $payment = $this->factory->mapResult([
            'id' => (new Id())->new()->toString(),
            'orderId' => $order->id()->toString(),
            'amount' => $order->price()->total(),
            'created' => (new DateHelper())->new()->toString(),
            'status' => PaymentStatus::Paid,
            'email' => $email,
            'posReference' => $posReference
        ]);

        $this->payment->set($payment);

        (new SetOrderService())->process(
            $order->id()->toString(),
            PaymentStatus::Paid,
            $order->createdById()->toString(),
            $order->preference(),
            $order->tableNumber(),
            $order->note(),
            $order->hide()
        );

        $this->setOutput($payment);
        return $this;
    }
}