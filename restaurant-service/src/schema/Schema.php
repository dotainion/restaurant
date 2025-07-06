<?php
namespace src\schema;

use Exception;
use tools\schema\Schema as ToolsSchema;

class Schema extends ToolsSchema{
    protected array $_excluded = [
        'run',
        '__construct',
        'permission',
        'rolePermission'
    ];

    public function user(){
        $this->sql->create('user')
            ->column('id')->bindary()
            ->column('firstName')->string()
            ->column('lastName')->string()
            ->column('email')->string()
            ->column('hide')->bool()
            ->column('date')->timestamp()
            ->column('gender')->string()
            ->column('phoneNumber')->string()
            ->column('addressId')->bindary()
            ->column('foreignId')->string();
        return $this->sql->execute();
    }

    public function address(){
        $this->sql->create('address')
            ->column('id')->bindary()
            ->column('country')->string()
            ->column('state')->string()
            ->column('address')->paragraph()
            ->column('apt')->string()
            ->column('zip')->string();
        return $this->sql->execute();
    }

    public function credential(){
        $this->sql->create('credential')
            ->column('id')->bindary()
            ->column('expire')->timestamp()
            ->column('password')->string()
            ->column('token')->string()
            ->column('refreshToken')->string();
        return $this->sql->execute();
    }

    public function message(){
        $this->sql->create('message')
            ->column('id')->bindary()
            ->column('message')->book()
            ->column('date')->timestamp()
            ->column('fromId')->bindary()
            ->column('toId')->bindary()
            ->column('read')->bool()
            ->column('hide')->bool();
        return $this->sql->execute();
    }

    public function role(){
        $this->sql->create('role')
            ->column('roleId')->bindary()
            ->column('restaurantId')->bindary()
            ->column('name')->string()
            ->column('role')->string()
            ->column('description')->paragraph()
            ->column('r')->bool()
            ->column('w')->bool()
            ->column('e')->bool()
            ->column('d')->bool()
            ->column('hide')->bool();
        return $this->sql->execute();
    }

    public function roleLink(){
        $this->sql->create('roleLink')
            ->column('roleId')->bindary()
            ->column('userId')->bindary();
        return $this->sql->execute();
    }

    public function product(){
        $this->sql->create('product')
            ->column('id')->bindary()
            ->column('restaurantId')->bindary()
            ->column('name')->string()
            ->column('price')->string()
            ->column('description')->paragraph()
            ->column('category')->string()
            ->column('imageRef')->string()
            ->column('created')->timestamp()
            ->column('hide')->bool();
        return $this->sql->execute();
    }

    public function order(){
        $this->sql->create('order')
            ->column('id')->bindary()
            ->column('orderNumber')->string()
            ->column('createdById')->bindary()
            ->column('restaurantId')->bindary()
            ->column('created')->timestamp()
            ->column('completedOn')->timestamp(true)
            ->column('preference')->string()
            ->column('tableNo')->string()
            ->column('note')->paragraph()
            ->column('status')->string()
            ->column('hide')->bool();
        return $this->sql->execute();
    }

    public function productOrder(){
        $this->sql->create('productOrder')
            ->column('linkId')->bindary()
            ->column('productId')->bindary()
            ->column('orderId')->bindary()
            ->column('amount')->string()
            ->column('note')->paragraph()
            ->column('hide')->bool()
            ->column('quantity')->string();
        return $this->sql->execute();
    }

    public function discount(){
        $this->sql->create('discount')
            ->column('discountId')->bindary()
            ->column('restaurantId')->bindary()
            ->column('title')->string()
            ->column('desc')->paragraph()
            ->column('amount')->string()
            ->column('start')->timestamp()
            ->column('end')->timestamp(true)
            ->column('date')->timestamp()
            ->column('type')->string()
            ->column('hide')->bool();
        return $this->sql->execute();
    }

    public function discountLink(){//link to product and discount
        $this->sql->create('discountLink')
            ->column('productId')->bindary()
            ->column('discountId')->bindary();
        return $this->sql->execute();
    }

    public function discountOrder(){
        $this->sql->create('discountOrder')
            ->column('linkId')->bindary()
            ->column('discountId')->bindary()
            ->column('productId')->bindary(true)//linked to product if id exist else its link to the entire order
            ->column('orderId')->bindary()
            ->column('price')->string()
            ->column('type')->string()
            ->column('note')->paragraph()
            ->column('hide')->bool();
        return $this->sql->execute();
    }

    public function reservation(){
        $this->sql->create('reservation')
            ->column('id')->bindary()
            ->column('restaurantId')->bindary()
            ->column('createdById')->bindary()
            ->column('status')->string()
            ->column('name')->string()
            ->column('number')->string()
            ->column('email')->string()
            ->column('created')->timestamp()
            ->column('date')->timestamp()
            ->column('people')->int()
            ->column('note')->paragraph();
        return $this->sql->execute();
    }

    public function restaurant(){
        $this->sql->create('restaurant')
            ->column('restaurantId')->bindary()
            ->column('name')->bindary()
            ->column('tagline')->string()
            ->column('logoRef')->string()
            ->column('isActive')->bool()
            ->column('phone')->string()
            ->column('email')->string()
            ->column('addressId')->bindary(true)
            ->column('cuisine')->paragraph()
            ->column('category')->paragraph()
            ->column('created')->timestamp()
            ->column('rating')->string()
            ->column('openingHours')->string()
            ->column('priceRange')->string();
        return $this->sql->execute();
    }

    public function restaurantLink(){
        $this->sql->create('restaurantLink')
            ->column('restaurantId')->bindary()
            ->column('userId')->bindary();
        return $this->sql->execute();
    }

    public function payment(){
        $this->sql->create('payment')
            ->column('id')->bindary()
            ->column('orderId')->bindary()
            ->column('restaurantId')->bindary()
            ->column('amount')->string()
            ->column('created')->timestamp()
            ->column('status')->string()
            ->column('email')->string()
            ->column('posReference')->string();
        return $this->sql->execute();
    }

    public function run(){
        foreach(get_class_methods($this) as $method){
            if(in_array($method, $this->_excluded)) continue;
            if (!is_callable([$this, $method])) {
                throw new Exception($method.' is not callable');
            }
            $this->$method()->reset();
        }
    }
}
