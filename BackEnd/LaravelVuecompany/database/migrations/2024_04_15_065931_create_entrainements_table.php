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
        Schema::create('entrainements', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_equipe')->constrained('equipes')->onDelete('cascade');
            $table->string('lieuEnt');
            $table->string('descEnt');
            $table->date('dateEnt')->nullable();
            $table->time('timeEnt')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('entrainements');
    }
};
