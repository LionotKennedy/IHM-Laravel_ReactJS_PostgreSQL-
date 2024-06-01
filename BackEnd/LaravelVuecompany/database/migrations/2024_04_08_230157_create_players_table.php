<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('players', function (Blueprint $table) {
            $table->id();
            $table->string('ImageP')->nullable();
            $table->string('NameP');
            $table->string('PaysP');
            $table->integer('AgeP')->nullable();
            $table->string('PosteP')->nullable();
            $table->integer('NombreP1')->nullable();
            $table->integer('NombreP2')->nullable();
            $table->integer('NombreP3')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('players');
    }
};
