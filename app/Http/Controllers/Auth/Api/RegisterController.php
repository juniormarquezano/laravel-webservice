<?php

namespace App\Http\Controllers\Auth\Api;

// use Illuminate\Http\Request;
use App\Http\Controllers\Auth\Api\Traits\AuthTrait;
use App\Http\Requests\AuthFormRequest as Request;
use App\Http\Controllers\Controller;
use App\User;

class RegisterController extends Controller
{
	use AuthTrait;

	/**
	 * @var User
	 */
	private $user;

	/**
	 * RegisterController constructor.
	 * @param User $user
	 */
	public function __construct(User $user)
	{
		// Caso tenha configurado o guard api para jwt o config/auth.php
		$this->middleware('auth:api')->except(['register']);

		/**
		 * @var \Illuminate\Database\Eloquent\Builder $user
		 */
		$this->user = $user;
	}

	/**
	 * @param Request $request
	 * @return \Illuminate\Http\JsonResponse
	 */
	public function register(Request $request)
	{
		$data = $request->all();
		$data['password'] = bcrypt($request->password);
		$user = $this->user->create($data);

		if ($user) {
			return $this->authenticate();
		}

		return response()->json(['error' => 'not_register'], 500);

	}

	/**
	 * @param Request $request
	 * @return \Illuminate\Http\JsonResponse
	 */
	public function updated(Request $request)
	{
		$response = $this->getUser();

		if ($response['status'] != 200) {
			return response()->json($response['response'], $response['status']);
		}

		$user = $response['response'];
		$user->update($request->all());

		return response()->json($user, 200);
	}
}
