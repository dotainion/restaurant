<?php
namespace src\module\reservation\repository;

use src\infrastructure\Repository;
use src\module\reservation\factory\ReservationFactory;
use src\module\reservation\objects\Reservation;
use tools\infrastructure\Collector;

class ReservationRepository extends Repository{
    protected ReservationFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new ReservationFactory();
    }

    public function create(Reservation $reservation):void{
        $this->insert('reservation')
            ->column('id', $this->uuid($reservation->id()))
            ->column('createdById', $this->uuid($reservation->createdById()))
            ->column('name', $reservation->name())
            ->column('status', $reservation->status())
            ->column('number', $reservation->number())
            ->column('email', $reservation->email())
            ->column('created', $reservation->created())
            ->column('date', $reservation->date())
            ->column('people', $reservation->people())
            ->column('note', $reservation->note());
        $this->execute();
    }
    
    public function edit(Reservation $reservation):void{
        $this->update('reservation')
            ->column('createdById', $this->uuid($reservation->createdById()))
            ->column('name', $reservation->name())
            ->column('status', $reservation->status())
            ->column('number', $reservation->number())
            ->column('email', $reservation->email())
            ->column('created', $reservation->created())
            ->column('date', $reservation->date())
            ->column('people', $reservation->people())
            ->column('note', $reservation->note())
            ->where()->eq('id', $this->uuid($reservation->id()));
        $this->execute();
    }
    
    public function listReservation(array $where=[]):Collector{
        $this->select('reservation');

        if(isset($where['id'])){
            $this->where()->eq('id', $this->uuid($where['id']));
        }
        if(isset($where['createdById'])){
            $this->where()->eq('createdById', $this->uuid($where['createdById']));
        }
        if(isset($where['restaurantId'])){
            $this->where()->eq('restaurantId', $this->uuid($where['restaurantId']));
        }
        if(isset($where['email'])){
            $this->where()->like('email', $where['email']);
        }
        if(isset($where['number'])){
            $this->where()->like('number', $where['number']);
        }
        if(isset($where['status'])){
            $this->where()->eq('status', $where['status']);
        }
        if(isset($where['name'])){
            $this->where()->like('name', $where['name']);
        }
        if(isset($where['from']) && isset($where['to'])){
            $this->where()->between('date', $where['from'], $where['to']);
            $this->union()->select('reservation');
            $this->where()->between('created', $where['from'], $where['to']);
        }
        $this->pagination()->set($this->request()->pagination()->get());
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}
