<?php

namespace App\Http\Controllers\Auth\Api;

// use App\Http\Requests\AuthFormRequest;
use App\Http\Controllers\Auth\Api\Traits\AuthTrait;
use App\User;
// use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class AuthenticateController extends Controller
{
	use AuthTrait;

	/**
	 * @var User
	 */
	private $user;

	/**
	 * AuthenticateController constructor.
	 * @param User $user
	 */
	public function __construct(User $user)
	{
		// Caso tenha configurado o guard api para jwt o config/auth.php
		$this->middleware('auth:api')->except(['authenticate', 'register']);
		/**
		 * @var \Illuminate\Database\Eloquent\Builder $user
		 */
		$this->user = $user;
	}

	public function getAuthenticatedUser()
	{
		$response = $this->getUser();

		if ($response['status'] != 200) {
			return response()->json($response['response'], $response['status']);
		}

		$user = $response['response'];

		// the token is valid and we have found the user via the sub claim
		// return response()->json(compact('user'));
		return response()->json(compact('user'));
	}

	public function refreshToken()
	{
		if (!$token = JWTAuth::getToken()) {
			return response()->json(['error' => 'token_not_send'], 401);
		}

		try {
			$token = JWTAuth::refresh();
		} catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
			return response()->json(['token_invalid'], $e->getStatusCode());
		}

		return response()->json(compact('token'));
	}
}
