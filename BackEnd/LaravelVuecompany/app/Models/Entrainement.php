<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Entrainement extends Model
{
    use HasFactory;
    protected $table = 'entrainements';
    protected $fillable = [
        'id_equipe',
        'lieuEnt',
        'descEnt',
        'dateEnt',
        'timeEnt',
    ];

}
