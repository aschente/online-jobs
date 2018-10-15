<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFreelancersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('freelancers', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('user_id');
            $table->string('data_of_birth');
            $table->char('gender', 1);
            $table->string('address');
            $table->string('postal_code');
            $table->string('phone_number');
            $table->text('overview');
            $table->string('job_title');
            $table->double('hourly_rate', 10, 2);
            $table->string('project_preference');
            $table->string('experience_level');
            $table->string('availability');
            $table->boolean('status');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('freelancers');
    }
}
