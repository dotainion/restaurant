<?php
namespace src\module\reservation\service;

use src\infrastructure\Service;
use src\module\reservation\factory\ReservationFactory;
use src\module\reservation\logic\SetReservation;
use tools\infrastructure\Assert;
use tools\infrastructure\DateHelper;
use tools\infrastructure\Id;

class SetReservationService extends Service{
    protected ReservationFactory $factory;
    protected SetReservation $reservation;

    public function __construct(){
        parent::__construct();
        $this->factory = new ReservationFactory();
        $this->reservation = new SetReservation();
    }
    
    public function process($id, $status, $name, $number, $email, $date, $people, $note){
        Assert::stringNotEmpty($status, 'Invalid status.');
        Assert::stringNotEmpty($name, 'Name is required.');
        Assert::validDate($date, 'Invalid date.');
        Assert::positiveNumber($people, 'Invalid people quantity.');
        
        $reservationId = new Id();
        $reservationId->isValid($id) ? $reservationId->set($id) : $reservationId->new();

        $restaurant = $this->factory->mapResult([
            'id' => $reservationId->toString(),
            'createdById' => $this->user()->id()->toString(),
            'created' => (new DateHelper())->new()->toString(),
            'status' => $status,
            'name' => $name,
            'date' => $date,
            'number' => $number,
            'email' => $email,
            'people' => $people,
            'note' => $note
        ]);

        $this->reservation->set($restaurant);

        $this->setOutput($restaurant);
        return $this;
    }
}