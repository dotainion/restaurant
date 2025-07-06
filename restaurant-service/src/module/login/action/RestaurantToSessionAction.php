<?php
namespace src\module\login\action;

use tools\infrastructure\IAction;
use tools\infrastructure\Request;
use src\module\login\service\RestaurantToSessionService;

class RestaurantToSessionAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new RestaurantToSessionService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('restaurantId')
        );
    }
}