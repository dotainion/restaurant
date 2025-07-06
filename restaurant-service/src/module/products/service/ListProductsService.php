<?php
namespace src\module\products\service;

use src\infrastructure\Service;
use src\module\products\logic\ListProduct;
use tools\infrastructure\Id;

class ListProductsService extends Service{
    protected ListProduct $product;

    public function __construct(){
        parent::__construct();
        $this->product = new ListProduct();
    }
    
    public function process($id, $name, $category){

        $id = (new Id())->isValid($id) ? new Id($id) : null;
        $name = empty($name) ? null : $name;
        $category = empty($category) ? null : $category;

        $collector = $this->product->list($id, $name, $category);
        $collector->assertHasItem('No products.');

        $this->setOutput($collector);
        return $this;
    }
}