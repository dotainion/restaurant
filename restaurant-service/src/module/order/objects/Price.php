<?php
namespace src\module\order\objects;

use tools\infrastructure\IId;
use tools\infrastructure\IObjects;

class Price  implements IObjects{
    protected Order $order;

    public function __construct(Order $order){
        $this->order = $order;
    }

    public function id():IId{
        return $this->order->id();
    }

    public function subtotal(): float {
        $total = 0.0;
        foreach ($this->order->products()->list() as $product) {
            $total += $product->price() * max(1, $product->quantity());
        }
        return round($total, 2);
    }

    public function discount(): float {
        $discount = 0.0;
        $products = [];
        foreach ($this->order->products()->list() as $product) {
            $products[$product->id()->toString()] = $product;
        }

        foreach ($this->order->discounts()->list() as $disc) {
            if ($disc->productId() !== null) {
                if (!isset($products[$disc->productId()->toString()])){
                    continue;
                }

                $prod = $products[$disc->productId()->toString()];
                $line = $prod->price() * max(1, $prod->quantity());
                $discount += $disc->type() === DiscountType::Percentage ? ($disc->amount() / 100) * $line : min($disc->amount(), $line);
            } else {
                $sub = $this->subtotal();
                $discount += $disc->type() ===  DiscountType::Percentage ? ($disc->amount() / 100) * $sub : min($disc->amount(), $sub);
            }
        }
        return round($discount, 2);
    }

    public function total(): float {
        return max(0.0, round($this->subtotal() - $this->discount(), 2));
    }
}