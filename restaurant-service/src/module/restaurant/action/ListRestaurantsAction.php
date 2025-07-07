<?php
namespace src\module\restaurant\action;

use tools\infrastructure\IAction;
use tools\infrastructure\Request;
use src\module\restaurant\service\ListRestaurantsService;

class ListRestaurantsAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new ListRestaurantsService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('userId')
        );
    }
}