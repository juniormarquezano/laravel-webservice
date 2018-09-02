<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\ProductFormRequest;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
	/**
	 * @var Product
	 */
	private $product;

	private $path = 'products';

	/**
	 * ProductController constructor.
	 * @param Product $product
	 */
	public function __construct(Product $product)
	{
		/** @var \Illuminate\Database\Eloquent\Builder $product */
		$this->product = $product;
	}

	/**
	 * Display a listing of the resource.
	 *
	 * @param Request $request
	 * @return \Illuminate\Http\Response
	 */
    public function index(Request $request)
    {
        // $products = $this->product->with('category')->paginate();
		$products = $this->product->getProducts($request->all());
        return response()->json($products, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  ProductFormRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ProductFormRequest $request)
    {
    	$data = $request->all();

    	if ($request->hasFile('image') && $request->file('image')->isValid()) {

    		$name = kebab_case($request->name);

    		$extension = $request->file('image')->extension();

    		$newName = "{$name}.{$extension}";

    		$data['image'] = $newName;

    		$upload = $request->file('image')->storeAs($this->path, $newName);

    		if (!$upload) {
    			return response()->json(['error' => 'Fail_Upload'], 500);
			}
		}

        $product = $this->product->create($data);

        return response()->json($product, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
		$product = $this->product->with('category')->findOrFail($id);

		return response()->json($product, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  ProductFormRequest  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(ProductFormRequest $request, $id)
    {
        $product = $this->product->findOrFail($id);

        $data = $request->all();

		if ($request->hasFile('image') && $request->file('image')->isValid()) {

			if ($product->image) {
				$path = "$this->path/{$product->image}";
				if (Storage::exists($path)) {
					Storage::delete($path);
				}
			}

			$name = kebab_case($request->name);

			$extension = $request->file('image')->extension();

			$newName = "{$name}.{$extension}";

			$data['image'] = $newName;

			$upload = $request->file('image')->storeAs($this->path, $newName);

			if (!$upload) {
				return response()->json(['error' => 'Fail_Upload'], 500);
			}
		}

		$product->update($data);

        return response()->json($product, 200);
    }

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int $id
	 * @return \Illuminate\Http\Response
	 * @throws \Exception
	 */
    public function destroy($id)
    {
		$product = $this->product->findOrFail($id);

		if ($product->image) {
			$path = "$this->path/{$product->image}";
			if (Storage::exists($path)) {
				Storage::delete($path);
			}
		}

		$product->delete();

		return response()->json(['success' => true], 204);
    }
}
