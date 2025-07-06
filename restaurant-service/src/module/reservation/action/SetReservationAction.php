<?php
namespace src\module\reservation\action;

use tools\infrastructure\IAction;
use tools\infrastructure\Request;
use src\module\reservation\service\SetReservationService;

class SetReservationAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new SetReservationService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('id'),
            $this->get('status'),
            $this->get('name'),
            $this->get('number'),
            $this->get('email'),
            $this->get('date'),
            $this->get('people'),
            $this->get('note')
        );
    }
}