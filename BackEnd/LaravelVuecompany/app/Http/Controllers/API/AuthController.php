<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

// use Dotenv\Exception\ValidationException;
// use Illuminate\Support\Facades\Request as FacadesRequest;
// use Symfony\Contracts\Service\Attribute\Required;

class AuthController extends Controller
{
    // Starting
    
    public function registers(Request $masaky){
        $validation = Validator::make($masaky->all(), [
            'name'=>'required|max:191',
            'email'=>'required|email|max:191|unique:users,email',
            'password'=>'required|min:8',
        ]);

        if($validation->fails())
        {
            return response()->json([
                'validation_errors'=>$validation->messages(),
            ]);
        }
        else
        {
            $user = User::create([
                'name'=>$masaky->name,
                'email'=>$masaky->email,
                'password'=>Hash::make($masaky->password),
            ]);

            $token = $user->createToken($user->email.'_Token')->plainTextToken;

            return response()->json([
                'status'=>200,
                'username'=>$user->name,
                'token'=>$token,
                'message'=>'Enregistrement réussi avec succès.',
            ]);
        }
    }


    //*********** Another like Login ***************//

    public function logins(Request $rasta) {
        $validation = Validator::make($rasta->all(), [
            'email'=>'Required|max:191',
            'password'=>'Required',
        ]);

        if($validation->fails()) {
            return response()->json([
                'validator_error'=>$validation->messages(),
            ]);
        }
        else
        {
            $user = User::where('email', $rasta->email)->first();

            if(! $user || ! Hash::check($rasta->password, $user->password)) {
                return response()->json([
                    'status'=>401,
                    'message'=>'Identifiants invalides',
                ]);
            }
            else {
                
            $token = $user->createToken($user->email.'_Token')->plainTextToken;

            return response()->json([
                'status'=>200,
                'username'=>$user->name,
                'token'=>$token,
                'message'=>'Connecté avec succès.',
            ]);

            }
        }
    }

    //******************* Logout *******************//

    public function logouts(Request $request){

        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Déconnexion réussie.',
        ]);

        // auth()->user()->Passport::tokens()->delete();
        // return response()->json([
        //     'status'=>200,
        //     'message'=>'Logged Out Successfuly',
        // ]);

    }
}
