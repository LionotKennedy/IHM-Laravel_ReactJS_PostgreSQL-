<?php

namespace App\Http\Controllers\API;

use App\Models\Player;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

// use Illuminate\Validation\Validator;
// use Illuminate\Validation\Validator as ValidationValidator;
// use Illuminate\Support\Facades\Hash;

class PlayerController extends Controller
{
    // add
    public function store(Request $request)
    {
        // $validation = Validator::make($request->all(), [
        //     // 'ImageP' => 'required|image|mimes:jpeg,png,jpg',
        //     'picture' => 'required|image|mimes:jpeg,png,jpg', // Ajoutez cette ligne
        //     'name' => 'required|max:191',
        //     'pays' => 'required|max:191',
        //     'age' => 'required|max:4',
        //     'radioValue' => 'required|max:191',
        //     'statu_1' => 'required|max:4',
        //     'statu_2' => 'required|max:4',
        //     'statu_3' => 'required|max:4',

        //     // 'ImageP'=>'required|image|mimes:jpeg,png,jpg',
        //     // 'NameP'=>'required|max:191',
        //     // 'PaysP'=>'required|max:191',
        //     // 'AgeP'=>'required|max:4',
        //     // 'PosteP'=>'required|max:191',
        //     // 'NombreP1'=>'required|max:4',
        //     // 'NombreP2'=>'required|max:4',
        //     // 'NombreP3'=>'required|max:4',
        // ]);

        // if ($validation->fails()) {
        //     return response()->json([
        //         'status' => 422,
        //         'errors' => $validation->messages(),
        //     ]);
        // } else {
        //     $player = new Player();
        //     $player->ImageP = $request->input('picture');
        //     $player->NameP = $request->input('name');
        //     $player->PaysP = $request->input('pays');
        //     $player->AgeP = $request->input('age');
        //     $player->PosteP = $request->input('radioValue');
        //     $player->NombreP1 = $request->input('statu_1');
        //     $player->NombreP2 = $request->input('statu_2');
        //     $player->NombreP3 = $request->input('statu_3');

        //     // if($request->hasFile('picture'))
        //     // {
        //     //     $file = $request->file('picture');
        //     //     $extension = $file->getClientOriginalExtension();
        //     //     $filename = time() .'.'.$extension;
        //     //     $file->move('uploads/player', $filename);
        //     //     $player->ImageP = 'uploads/player'.$filename;
        //     // }

        //     // if ($request->hasFile('ImageP')) // Assurez-vous que le nom du champ correspond
        //     // {
        //     //     $file = $request->file('ImageP'); // Utilisez le même nom de champ ici
        //     //     $extension = $file->getClientOriginalExtension();
        //     //     $filename = time() . '.' . $extension;
        //     //     $file->move('uploads/player', $filename);
        //     //     $player->ImageP = 'uploads/player/' . $filename; // Assurez-vous que le chemin est correct
        //     // }

        //     if ($request->hasFile('picture')) {
        //         $file = $request->file('picture');
        //         $extension = $file->getClientOriginalExtension();
        //         $filename = time() . '.' . $extension;
        //         $file->move('uploads/player', $filename);
        //         $player->ImageP = 'uploads/player' . $filename;
        //     }

        //     $player->save();

        //     return response()->json([
        //         'status' => 200,
        //         'message' => 'Player added successfully',
        //     ]);
        // }



        $validation = Validator::make($request->all(), [

            // 'ImageP' => 'required|ImageP|mimes:jpeg,png,jpg|max:2048',
            // 'Image' => 'required|mimes:png,jpg,jpeg,webp',
            'NameP' => 'required|max:191',
            'PaysP' => 'required|max:191',
            'AgeP' => 'required|integer|max:9999',
            'PosteP' => 'required|max:191',
            'NombreP1' => 'required|integer|max:9999',
            'NombreP2' => 'required|integer|max:9999',
            'NombreP3' => 'required|integer|max:9999',
            'ImageP' => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        if ($validation->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validation->messages(),
            ]);
        } else {
            // database variable
            $player = new Player();
            $player->NameP = $request->input('NameP');
            $player->PaysP = $request->input('PaysP');
            $player->AgeP = $request->input('AgeP');
            $player->PosteP = $request->input('PosteP');
            $player->NombreP1 = $request->input('NombreP1');
            $player->NombreP2 = $request->input('NombreP2');
            $player->NombreP3 = $request->input('NombreP3');

            if ($request->hasFile('ImageP')) {
                $file = $request->file('ImageP');
                $extension = $file->getClientOriginalExtension();
                $filename = time() . '.' . $extension;
                $file->move('uploads/player', $filename);
                $player->ImageP = 'uploads/player/' . $filename;
            }
            $player->save();

            return response()->json([
                'status' => 200,
                'message' =>  "Le joueur a été ajouté avec succès.",
            ]);
        }
    }

    // display
    public function index()
    {
        $player = Player::all();
        return response()->json([
            'status' => 200,
            'player' => $player
        ]);
    }

    // Edit
    public function edit($id)
    {
        $player = Player::find($id);
        if ($player) {
            return response()->json([
                'status' => 200,
                'message' => $player,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => "Aucun joueur trouvé.",
            ]);
        }
    }
    // Update
    public function update(Request $request, $id)
    {
        $validation = Validator::make($request->all(), [

            // 'ImageP' => 'required|ImageP|mimes:jpeg,png,jpg|max:2048',
            // 'Image' => 'required|mimes:png,jpg,jpeg,webp',
            // 'ImageP' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'NameP' => 'required|max:191',
            'PaysP' => 'required|max:191',
            'AgeP' => 'required|integer|max:9999',
            'PosteP' => 'required|max:191',
            'NombreP1' => 'required|integer|max:9999',
            'NombreP2' => 'required|integer|max:9999',
            'NombreP3' => 'required|integer|max:9999',
        ]);

        if ($validation->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validation->messages(),
            ]);
        } else {
            // database variable
            $player = Player::find($id);
            if ($player) {

                $player->NameP = $request->input('NameP');
                $player->PaysP = $request->input('PaysP');
                $player->AgeP = $request->input('AgeP');
                $player->PosteP = $request->input('PosteP');
                $player->NombreP1 = $request->input('NombreP1');
                $player->NombreP2 = $request->input('NombreP2');
                $player->NombreP3 = $request->input('NombreP3');

                if ($request->hasFile('ImageP')) {
                    $path = $player->ImageP;
                    if (File::exists($path)) {
                        File::delete($path);
                    }
                    $file = $request->file('ImageP');
                    $extension = $file->getClientOriginalExtension();
                    $filename = time() . '.' . $extension;
                    $file->move('uploads/player', $filename);
                    $player->ImageP = 'uploads/player/' . $filename;
                }
                $player->update();

                return response()->json([
                    'status' => 200,
                    'message' =>  "Le joueur a été mis à jour avec succès.",
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => "Aucun joueur trouvé.",
                ]);
            }
        }
    }

    // Delete
    public function destroy($id)
    {
        $player = Player::find($id);
        if ($player) {
            $path = $player->ImageP;
            if (File::exists($path)) {
                File::delete($path);
            }
            $player->delete();
            return response()->json([
                'status' => 200,
                'message' => "Le joueur a été supprimé avec succès.",
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => "Aucun joueur trouvé.",
            ]);
        }
    }

    // Select all
    public function allPlayer()
    {
        $player = Player::all();
        return response()->json([
            'status' => 200,
            'player' => $player
        ]);
        // $player = Player::where('status','0')->get();
        // return response()->json([
        //     'status' => 200,
        //     'player' => $player
        // ]);
    }
}
