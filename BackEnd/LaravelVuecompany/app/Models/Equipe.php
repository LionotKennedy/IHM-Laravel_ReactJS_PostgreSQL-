<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Equipe extends Model
{
    use HasFactory;
    protected $table = 'equipes';
    protected $fillable = [
        'logoQ',
        'nameQ',
        'paysQ',
        'villeQ',
    ];
}
