<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\CategoryFormRequest;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Category;

class CategoryController extends Controller
{
	/**
	 * @var Category
	 */
	private $category;

	/**
	 * CategoryController constructor.
	 * @param Category $category
	 */
	public function __construct(Category $category)
	{
		/** @var \Illuminate\Database\Eloquent\Builder $category */
		$this->category = $category;

		$this->middleware('auth:api')->except(['index']);
	}

	/**
	 * Display a listing of the resource.
	 *
	 * @param Request $request
	 * @return \Illuminate\Http\Response
	 */
    public function index(Request $request)
    {
		// $categories = $this->category->where('name', 'LIKE', "%$request->name%")->get();
		// Passando a responsabilidade para o model
		$categories = $this->category->getCategories($request->input('name'));
		return response()->json($categories, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  CategoryFormRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CategoryFormRequest $request)
    {
        $category = $this->category->create($request->all());

        return response()->json($category, 201); // Status 201 para Created
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $category = $this->category->with('products')->findOrFail($id);

        return response()->json($category, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  CategoryFormRequest  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(CategoryFormRequest $request, $id)
    {
        // $category = $this->category->findOrFail($id);
		$category = $this->category->find($id);

		if (!$category) {
			return response()->json(['error' => 'not_found'], 404);
		}

        $category->update($request->all());

        return response()->json($category, 200);
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
		$category = $this->category->find($id);

		if (!$category) {
			return response()->json(['error' => 'not_found'], 404);
		}

		$category->delete();

		return response()->json(['success' => true], 204);
    }

    public function products($id)
	{
		// Consulta unica, mais perde caso queira paginar
		// $category = $this->category->with('products')->findOrFail($id);

		// Caso queira paginar os produtos
		$category = $this->category->findOrFail($id);

		$products = $category->products()->paginate(3);

		return response()->json([
			'category' => $category,
			'products' => $products
		], 200);
	}
}
