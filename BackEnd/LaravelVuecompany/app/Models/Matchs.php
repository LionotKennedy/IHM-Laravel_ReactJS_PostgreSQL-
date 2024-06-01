<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Matchs extends Model
{
    use HasFactory;
    protected $table = 'matchs';
    protected $fillable = [
        'id_equipe_1',
        'id_equipe_2',
        'score_1',
        'score_2',
        'dateMa',
        'timeMa',
    ];
}
