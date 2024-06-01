<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\Equipe;
use Illuminate\Support\Facades\File;

class EquipeController extends Controller
{
    // Add
    public function store(Request $request)
    {

        $validation = Validator::make($request->all(), [

            'nameQ' => 'required|max:191',
            'paysQ' => 'required|max:191',
            'villeQ' => 'required|max:191',
            'logoQ' => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        if ($validation->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validation->messages(),
            ]);
        } else {
            // database variable
            $equipe = new Equipe();
            $equipe->nameQ = $request->input('nameQ');
            $equipe->paysQ = $request->input('paysQ');
            $equipe->villeQ = $request->input('villeQ');

            if ($request->hasFile('logoQ')) {
                $file = $request->file('logoQ');
                $extension = $file->getClientOriginalExtension();
                $filename = time() . '.' . $extension;
                $file->move('uploads/equipe', $filename);
                $equipe->logoQ = 'uploads/equipe/' . $filename;
            }
            $equipe->save();

            return response()->json([
                'status' => 200,
                'message' =>  "L'équipe a été ajoutée avec succès.",
            ]);
        }
    }

    // display
    public function index()
    {
        $equipe = Equipe::all();
        return response()->json([
            'status' => 200,
            'equipe' => $equipe
        ]);
    }

    // Edit
    public function edit($id)
    {
        $equipe = Equipe::find($id);
        if ($equipe) {
            return response()->json([
                'status' => 200,
                'message' => $equipe,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => "Aucune équipe trouvée.",
            ]);
        }
    }


    // Update
    public function update(Request $request, $id)
    {
        $validation = Validator::make($request->all(), [
            'nameQ' => 'required|max:191',
            'paysQ' => 'required|max:191',
            'villeQ' => 'required|max:191',
            // 'logoQ' => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        if ($validation->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validation->messages(),
            ]);
        } else {
            // database variable
            $equipe = Equipe::find($id);
            if ($equipe) {

                $equipe->nameQ = $request->input('nameQ');
                $equipe->paysQ = $request->input('paysQ');
                $equipe->villeQ = $request->input('villeQ');

                if ($request->hasFile('logoQ')) {
                    $path = $equipe->logoQ;
                    if (File::exists($path)) {
                        File::delete($path);
                    }
                    $file = $request->file('logoQ');
                    $extension = $file->getClientOriginalExtension();
                    $filename = time() . '.' . $extension;
                    $file->move('uploads/player', $filename);
                    $equipe->logoQ = 'uploads/player/' . $filename;
                }
                $equipe->update();

                return response()->json([
                    'status' => 200,
                    'message' => "L'équipe a été modifier avec succès.",
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => "Aucune équipe trouvée.",
                ]);
            }
        }
    }

    // Delete
    public function destroy($id)
    {
        $equipe = Equipe::find($id);
        if ($equipe) {
            $path = $equipe->ImageP;
            if (File::exists($path)) {
                File::delete($path);
            }
            $equipe->delete();
            return response()->json([
                'status' => 200,
                'message' =>  "L'équipe a été supprimée avec succès.",
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => "Aucune équipe trouvée.",
            ]);
        }
    }
}
