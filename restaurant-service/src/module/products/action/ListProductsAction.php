<?php
namespace src\module\products\action;

use tools\infrastructure\IAction;
use tools\infrastructure\Request;
use src\module\products\service\ListProductsService;

class ListProductsAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new ListProductsService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('id'),
            $this->get('name'),
            $this->get('category'),
        );
    }
}