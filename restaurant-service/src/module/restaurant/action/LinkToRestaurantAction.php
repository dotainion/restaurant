<?php
namespace src\module\restaurant\action;

use tools\infrastructure\IAction;
use tools\infrastructure\Request;
use src\module\restaurant\service\LinkToRestaurantService;

class LinkToRestaurantAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new LinkToRestaurantService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('userId'),
            $this->get('restaurantId')
        );
    }
}