<?php
namespace src\module\reservation\service;

use src\infrastructure\Service;
use src\module\reservation\logic\ListReservation;
use tools\infrastructure\Assert;
use tools\infrastructure\DateHelper;
use tools\infrastructure\Id;

class ListReservationsService extends Service{
    protected ListReservation $reservation;

    public function __construct(){
        parent::__construct();
        $this->reservation = new ListReservation();
    }
    
    public function process($status, $from, $to){
        Assert::validDate($from, 'Invalid date.');
        Assert::validDate($to, 'Invalid date.');

        if(!empty($status)){
            Assert::inArray($status, ['pending', 'arrived', 'canceled'], 'Invalid status');
        }

        $collector = $this->reservation->list(new DateHelper($from), new DateHelper($to), $status);

        $this->setOutput($collector);
        return $this;
    }
}