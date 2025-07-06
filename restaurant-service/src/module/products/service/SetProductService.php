<?php
namespace src\module\products\service;

use src\infrastructure\Service;
use src\module\products\factory\ProductFactory;
use src\module\products\logic\SetProduct;
use tools\infrastructure\Assert;
use tools\infrastructure\DateHelper;
use tools\infrastructure\Id;

class SetProductService extends Service{
    protected ProductFactory $factory;
    protected SetProduct $product;

    public function __construct(){
        parent::__construct();
        $this->factory = new ProductFactory();
        $this->product = new SetProduct();
    }
    
    public function process($id, $name, $price, $description, $category, $hide, $image){
        Assert::stringNotEmpty($name, 'Product name is required.');
        Assert::stringNotEmpty($price, 'Product price is required.');
        Assert::positiveNumber($price, 'Product price must be a positive number.');
        Assert::stringNotEmpty($category, 'Product category is required.');

        $productId = new Id();
        $productId->isValid($id) ? $productId->set($id) : $productId->new();

        $product = $this->factory->mapResult([
            'id' => $productId->toString(),
            'name' => $name,
            'price' => $price,
            'description' => $description,
            'category' => $category,
            'imageRef' => '',
            'created' => (new DateHelper())->new()->toString(),
            'hide' => $hide
        ]);

        $this->product->set($product);

        $this->setOutput($product);
        return $this;
    }
}