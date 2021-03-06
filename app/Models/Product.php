<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = ['name', 'description', 'image', 'category_id'];

    public function category()
	{
		return $this->belongsTo(Category::class);
	}

	public function getProducts($data, $total = 15)
	{
		if (!isset($data['filter']) && !isset($data['name']) && !isset($data['description']) && !isset($data['category_id'])) {
			return $this->orderBy('updated_at', 'desc')->paginate($total);
		}

		$query = $this->where(function ($query) use ($data) {
			if (isset($data['filter'])) {
				$filter = $data['filter'];
				$query->where('name', $filter);
				$query->orWhere('description', 'LIKE', "%{$filter}%");
			}

			if (isset($data['name'])) {
				$query->where('name', $data['name']);
			}

			if (isset($data['category_id'])) {
				$query->where('category_id', $data['category_id']);
			}

			if (isset($data['description'])) {
				$query->where('description', 'LIKE', "%{$data['description']}%");
			}
		})
		->orderBy('updated_at')
		->paginate($total);
		// ->toSql(); // toSql()
		// dd($query);
		return $query;
	}
}
