<?php
namespace src\module\reservation\factory;

use src\module\reservation\objects\Reservation;
use tools\infrastructure\Collector;
use tools\infrastructure\Factory;

class ReservationFactory extends Collector{
    use Factory;

    public function __construct(){
    }

    public function mapResult($record):Reservation{
        return new Reservation(
            $this->uuid($record['id']),
            $this->uuid($record['createdById']),
            $record['status'],
            $record['name'],
            $record['created'],
            $record['date'],
            $record['number'] ?? null,
            $record['email'] ?? null,
            (int)$record['people'],
            $record['note'] ?? null
        );
    }
}