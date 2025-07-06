<?php
namespace src\module\reservation\logic;

use src\module\reservation\repository\ReservationRepository;
use tools\infrastructure\Collector;
use tools\infrastructure\DateHelper;

class ListReservation{
    protected ReservationRepository $repo;

    public function __construct(){
        $this->repo = new ReservationRepository();
    }
    
    public function list(DateHelper $from, DateHelper $to, ?string $status):Collector{
        return $this->repo->listReservation([
            'from' => $from,
            'to' => $to,
        ]);
    }
}