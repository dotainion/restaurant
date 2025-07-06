<?php
namespace src\module\reservation\logic;

use src\module\reservation\objects\Reservation;
use src\module\reservation\repository\ReservationRepository;

class SetReservation{
    protected ReservationRepository $repo;

    public function __construct(){
        $this->repo = new ReservationRepository();
    }
    
    public function set(Reservation $reservation):void{
        $collector = $this->repo->listReservation([
            'id' => $reservation->id()
        ]);
        if($collector->isEmpty()){
            $this->repo->create($reservation);
            return;
        }
        $this->repo->edit($reservation);
    }
}