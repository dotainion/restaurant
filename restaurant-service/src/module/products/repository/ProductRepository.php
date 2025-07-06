<?php
namespace src\module\products\repository;

use src\infrastructure\Repository;
use src\module\products\factory\ProductFactory;
use src\module\products\objects\Product;
use tools\infrastructure\Collector;

class ProductRepository extends Repository{
    protected ProductFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new ProductFactory();
    }
    
    public function create(Product $product):void{
        $this->insert('product')        
            ->column('id', $this->uuid($product->id()))
            ->column('name', $product->name())
            ->column('price', $product->price())
            ->column('description', $product->description())
            ->column('category', $product->category())
            ->column('imageRef', $product->imageRef())
            ->column('created', $product->created())
            ->column('hide', $product->hide());
        $this->execute();
    }
    
    public function edit(Product $product):void{
        $this->update('product')        
            ->column('name', $product->name())
            ->column('price', $product->price())
            ->column('description', $product->description())
            ->column('category', $product->category())
            ->column('imageRef', $product->imageRef())
            ->column('hide', $product->hide())
            ->where()->eq('id', $this->uuid($product->id()));
        $this->execute();
    }
    
    public function listProducts(array $where=[]):Collector{
        $this->select('product')
            ->join()->left('discountLink', 'productId', 'product', 'id')
            ->cursor()->join()->left('discount', 'discountId', 'discountLink', 'discountId');

        if(isset($where['id'])){
            $this->where()->eq('id', $this->uuid($where['id']));
        }
        if(isset($where['name'])){
            $this->where()->like('name', $where['name']);
        }
        if(isset($where['category'])){
            $this->where()->eq('category', $where['category']);
        }
        if(isset($where['hide'])){
            $this->where()->eq('hide', (int)$where['hide']);
        }else{
            $this->where()->eq('hide', 0);
        }
        $this->pagination()->set($this->request()->pagination()->get());
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}