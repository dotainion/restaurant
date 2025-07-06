<?php
namespace src\module\payment\service;

use src\infrastructure\Service;
use src\module\payment\logic\ListPayments;
use tools\infrastructure\Assert;
use tools\infrastructure\DateHelper;

class ListPaymentsService extends Service{
    protected ListPayments $payment;

    public function __construct(){
        parent::__construct();
        $this->payment = new ListPayments();
    }
    
    public function process($from, $to){
        Assert::validDate($from, 'Invalid date is invalid.');
        Assert::validDate($to, 'Invalid date is invalid.');

        $collector = $this->payment->list(new DateHelper($from), new DateHelper($to));
        $collector->assertHasItem('No payments found.');

        $this->setOutput($collector);
        return $this;
    }
}