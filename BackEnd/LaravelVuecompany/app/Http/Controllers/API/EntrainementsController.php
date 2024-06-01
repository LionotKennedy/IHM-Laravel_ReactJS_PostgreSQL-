<?php

namespace App\Http\Controllers\API;

use App\Models\Entrainement;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class EntrainementsController extends Controller
{
    public function storage(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'id_equipe' => 'required|integer',
            'lieuEnt' => 'required|max:191',
            'descEnt' => 'required|max:191',
            'dateEnt' => 'required|date',
            'timeEnt' => 'required',
        ]);

        if ($validation->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validation->messages(),
            ]);
        } else {
            // database variable
            $entrainement = new Entrainement();
            $entrainement->id_equipe = $request->input('id_equipe');
            $entrainement->lieuEnt = $request->input('lieuEnt');
            $entrainement->descEnt = $request->input('descEnt');
            $entrainement->dateEnt = $request->input('dateEnt');
            $entrainement->timeEnt = $request->input('timeEnt');

            $entrainement->save();
            return response()->json([
                'status' => 200,
                'message' => 'Entraînement ajouté avec succès.',
            ]);
        }
    }

    // display
    public function index()
    {
        $entrainement = DB::table('entrainements')
            ->join('equipes', 'equipes.id', '=', 'entrainements.id_equipe')
            ->select('entrainements.id as entrainements_id', 'entrainements.id_equipe', 'entrainements.lieuEnt', 'entrainements.descEnt', 'entrainements.dateEnt', 'entrainements.timeEnt', 'equipes.*')
            ->get();
        return response()->json([
            'status' => 200,
            'entrainement' => $entrainement
        ]);
    }

    
    // Edit
    public function edit($id)
    {
        $entrainement = Entrainement::find($id);
        if ($entrainement) {
            return response()->json([
                'status' => 200,
                'message' => $entrainement,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Aucun entraînement trouvé.',
            ]);
        }
    }

     // Update
     public function update(Request $request, $id)
     {
         $validation = Validator::make($request->all(), [
            'id_equipe' => 'required|integer',
            'lieuEnt' => 'required|max:191',
            'descEnt' => 'required|max:191',
            'dateEnt' => 'required|date',
            'timeEnt' => 'required',
         ]);
 
         if ($validation->fails()) {
             return response()->json([
                 'status' => 422,
                 'errors' => $validation->messages(),
             ]);
         } else {
             // database variable
             $entrainement = Entrainement::find($id);
             if ($entrainement) {
                $entrainement->id_equipe = $request->input('id_equipe');
                $entrainement->lieuEnt = $request->input('lieuEnt');
                $entrainement->descEnt = $request->input('descEnt');
                $entrainement->dateEnt = $request->input('dateEnt');
                $entrainement->timeEnt = $request->input('timeEnt');
 
                 $entrainement->update();
 
                 return response()->json([
                     'status' => 200,
                     'message' => "Mise à jour de l'entraînement effectuée avec succès.",
                 ]);
             } else {
                 return response()->json([
                     'status' => 404,
                     'message' => 'Aucun entraînement trouvé.',
                 ]);
             }
         }
     }

            // Delete
            public function destroy($id)
            {
                $entrainement = Entrainement::find($id);
                if ($entrainement) {
                    $entrainement->delete();
                    return response()->json([
                        'status' => 200,
                        'message' => "Suppression de l'entraînement effectuée avec succès.",
                    ]);
                } else {
                    return response()->json([
                        'status' => 404,
                        'message' => 'Aucun entraînement trouvé.',
                    ]);
                }
            }
}
