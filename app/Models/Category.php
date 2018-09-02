<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
	protected $fillable = ['name'];

	public function products()
	{
		return $this->hasMany(Product::class);
	}

    public function getCategories($name = null)
	{
		// Dessa forma a consulta com where se nada for passado
		if (!$name) {
			return $this->get();
		}
		return $this->where('name', 'LIKE', "%$name%")->get();
	}
}
