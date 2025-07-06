<?php
namespace src\module\payment\logic;

use src\module\payment\repository\PaymentRepository;
use tools\infrastructure\Collector;
use tools\infrastructure\DateHelper;

class ListPayments{
    protected PaymentRepository $repo;

    public function __construct(){
        $this->repo = new PaymentRepository();
    }

    public function list(DateHelper $from, DateHelper $to):Collector{
        return $this->repo->listPayments([
            'from' => $from,
            'to' => $to,
        ]);
    }
}