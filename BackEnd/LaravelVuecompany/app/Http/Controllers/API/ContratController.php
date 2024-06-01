<?php

namespace App\Http\Controllers\API;

use App\Models\Contrat;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class ContratController extends Controller
{
    public function storage(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'id_player' => 'required|max:191',
            'salaire' => 'required|integer',
            'dateDebut' => 'required|date',
            'dateExp' => 'required|date',
        ]);

        if ($validation->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validation->messages(),
            ]);
        } else {
            // database variable
            $contrat = new Contrat();
            $contrat->id_player = $request->input('id_player');
            $contrat->salaire = $request->input('salaire');
            $contrat->dateDebut = $request->input('dateDebut');
            $contrat->dateExp = $request->input('dateExp');

            $contrat->save();
            return response()->json([
                'status' => 200,
                'message' => 'Contrat ajouté avec succès.',
            ]);
        }
    }

    // public function index()
    // {
    //     $contrat = DB::table('contrats')
    //         ->join('players', 'players.id', '=', 'contrats.id_player')
    //         ->select('contrats.*', 'players.*')
    //         ->get();
    //     return response()->json([
    //         'status' => 200,
    //         'contrat' => $contrat
    //     ]);
    // }

    public function index()
    {
        $contrats = DB::table('contrats')
            ->join('players', 'players.id', '=', 'contrats.id_player')
            ->select('contrats.id as contrat_id', 'contrats.id_player', 'contrats.salaire', 'contrats.dateDebut', 'contrats.dateExp', 'players.*')
            ->get();
        return response()->json([
            'status' => 200,
            'contrats' => $contrats
        ]);
    }
    
    public function index_2()
    {
        $contrat = Contrat::all();
        return response()->json([
            'status' => 200,
            'player' => $contrat
        ]);
    }

    // Edit
    public function edit($id)
    {
        $contrat = Contrat::find($id);
        if ($contrat) {
            return response()->json([
                'status' => 200,
                'message' => $contrat,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Aucun contrat trouvé.',
            ]);
        }
    }

    // Update
    public function update(Request $request, $id)
    {
        $validation = Validator::make($request->all(), [
            'id_player' => 'required|max:191',
            'salaire' => 'required|integer',
            'dateDebut' => 'required|date',
            'dateExp' => 'required|date',
        ]);

        if ($validation->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validation->messages(),
            ]);
        } else {
            // database variable
            $contrat = Contrat::find($id);
            if ($contrat) {
                $contrat->id_player = $request->input('id_player');
                $contrat->salaire = $request->input('salaire');
                $contrat->dateDebut = $request->input('dateDebut');
                $contrat->dateExp = $request->input('dateExp');

                $contrat->update();

                return response()->json([
                    'status' => 200,
                    'message' => 'Contrat mis à jour avec succès.',
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'Aucun contrat trouvé.',
                ]);
            }
        }
    }

        // Delete
        public function destroy($id)
        {
            $contrat = Contrat::find($id);
            if ($contrat) {
                $contrat->delete();
                return response()->json([
                    'status' => 200,
                    'message' => 'Contrat supprimé avec succès.',
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'Aucun contrat trouvé.',
                ]);
            }
        }
    
}
