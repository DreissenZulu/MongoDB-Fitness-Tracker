function writeExercises(id) {
    $("#getFit").html(`
    <h2>Current Routine</h2>
    <ul id="exerciseList"></ul>
    `)
    $.ajax({
        url: `/populate/${id}`,
        method: "GET",
        success: result => {
            for (exercise of result[0].exercises) {
                $("#exerciseList").append(`<li>${exercise.name} (Reps: ${exercise.reps})</li>`)
            }
        }
    })
}

$("#loadWorkout").click(() => {
    $.ajax({
        url: "/workouts",
        method: "GET",
        success: result => {
            $("#getFit").html("<h2>Choose a workout routine</h2>")
            for (routine of result) {
                $("#getFit").append(`
                    <button class="btn btn-success workoutBtn" value="${routine._id}">${routine.name}</button>
                `)
            }
            $(".workoutBtn").click(event => {
                let workoutID = $(event.currentTarget).val();
                writeExercises(workoutID)
                $("#getFit").append(`
                <h2>Add Exercise to ${$(event.currentTarget).text()}</h2>
                <form action="/add" method="post">
                    <div class="form-group>
                        <label for="exerciseName">Name of Exercise</label>
                        <input class="form-control" type="text" name="exerciseName" value="" placeholder="Exercise">
                    </div>
                    <div class="form-group">
                        <label for="exerciseReps">Number of Reps</label>
                        <input class="form-control" type="number" name="exerciseReps" value="" placeholder="# of Reps">
                    </div>
                    <button class="btn btn-primary" id="addExercise">Add to Workout</button>
                </form>
                `);
                $("#addExercise").click((event) => {
                    event.preventDefault();
                    let newExercise = {
                        workout: workoutID,
                        name: $("input[name*='exerciseName']").val(),
                        reps: $("input[name*='exerciseReps']").val()
                    }
                    $.ajax({
                        url: "/add",
                        data: newExercise,
                        method: "POST",
                        success: result => {
                            location.reload();
                        }
                    })
                })
            })
        }
    })
});

$("#newWorkout").click(() => {
    $("#getFit").html(`
    <form action="/submit" method="post">
        <div class="form-group>
            <label for="workoutName">Name of Workout Routine</label>
            <input class="form-control" type="text" name="workoutName" value="" placeholder="Workout Title">
        </div>
        <button class="btn btn-primary" id="createWorkout">Submit</button>
    </form>
    `);
    $("#createWorkout").click((event) => {
        event.preventDefault();
        $.ajax({
            url: "/submit",
            data: {name: $("input[name*='workoutName']").val()},
            method: "POST",
            success: () => {
                location.reload();
            }
        })
    })
});

