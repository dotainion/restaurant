<?php
namespace src\module\reservation\action;

use tools\infrastructure\IAction;
use tools\infrastructure\Request;
use src\module\reservation\service\ListReservationsService;

class ListReservationsAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new ListReservationsService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('status'),
            $this->get('from'),
            $this->get('to'),
        );
    }
}