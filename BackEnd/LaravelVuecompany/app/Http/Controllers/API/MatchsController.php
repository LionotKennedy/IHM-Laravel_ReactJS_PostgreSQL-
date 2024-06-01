<?php

namespace App\Http\Controllers\API;

use App\Models\Matchs;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class MatchsController extends Controller
{
    public function storage(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'id_equipe_1' => 'required|max:191',
            'id_equipe_2' => 'required|max:191',
            'score_1' => 'required|integer',
            'score_2' => 'required|integer',
            'dateMa' => 'required|date',
            'timeMa' => 'required',
        ]);

        if ($validation->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validation->messages(),
            ]);
        } else {
            // database variable
            $matchs = new Matchs();
            $matchs->id_equipe_1 = $request->input('id_equipe_1');
            $matchs->id_equipe_2 = $request->input('id_equipe_2');
            $matchs->score_1 = $request->input('score_1');
            $matchs->score_2 = $request->input('score_2');
            $matchs->dateMa = $request->input('dateMa');
            $matchs->timeMa = $request->input('timeMa');

            $matchs->save();
            return response()->json([
                'status' => 200,
                'message' =>  "Les matchs ont été ajoutés avec succès.",
            ]);
        }
    }

    // // display


    public function index()
{
    $matches = DB::table('matchs')
        ->join('equipes as equipe1', 'equipe1.id', '=', 'matchs.id_equipe_1')
        ->join('equipes as equipe2', 'equipe2.id', '=', 'matchs.id_equipe_2')
        ->select(
            'matchs.id as matchs_id',
            'matchs.id_equipe_1',
            'matchs.id_equipe_2',
            'matchs.score_1',
            'matchs.score_2',
            'matchs.dateMa',
            'matchs.timeMa',
            'equipe1.logoQ as logoQ1',
            'equipe1.nameQ as nameQ1',
            'equipe2.logoQ as logoQ2',
            'equipe2.nameQ as nameQ2'
        )
        ->get();

    return response()->json([
        'status' => 200,
        'matches' => $matches
    ]);
}


    // Edit
    public function edit($id)
    {
        $match = Matchs::find($id);
        if ($match) {
            return response()->json([
                'status' => 200,
                'message' => $match,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => "Aucun résultat trouvé.",
            ]);
        }
    }
    // Update
    public function update(Request $request, $id)
    {
        $validation = Validator::make($request->all(), [
            'id_equipe_1' => 'required|max:191',
            'id_equipe_2' => 'required|max:191',
            'score_1' => 'required|integer',
            'score_2' => 'required|integer',
            'dateMa' => 'required|date',
            'timeMa' => 'required',
        ]);

        if ($validation->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validation->messages(),
            ]);
        } else {
            // database variable
            $matchs = Matchs::find($id);
            if ($matchs) {
                $matchs->id_equipe_1 = $request->input('id_equipe_1');
                $matchs->id_equipe_2 = $request->input('id_equipe_2');
                $matchs->score_1 = $request->input('score_1');
                $matchs->score_2 = $request->input('score_2');
                $matchs->dateMa = $request->input('dateMa');
                $matchs->timeMa = $request->input('timeMa');

                $matchs->update();

                return response()->json([
                    'status' => 200,
                    'message' => "Les matchs ont été mis à jour avec succès.",
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => "Aucun résultat trouvé.",
                ]);
            }
        }
    }


       // Delete
       public function destroy($id)
       {
           $match = Matchs::find($id);
           if ($match) {
               $match->delete();
               return response()->json([
                   'status' => 200,
                   'message' => "Le match a été supprimé avec succès.",
               ]);
           } else {
               return response()->json([
                   'status' => 404,
                   'message' => "Aucun résultat trouvé.",
               ]);
           }
       }
}
