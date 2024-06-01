<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Player extends Model
{
    use HasFactory;
    protected $table = 'players';
    protected $fillable = [
        'ImageP',
        'NameP',
        'PaysP',
        'AgeP',
        'PosteP',
        'NombreP1',
        'NombreP2',
        'NombreP3',
    ];
}
