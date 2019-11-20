$("#loadWorkout").click(() => {
    $.ajax({
        url: "/workouts",
        method: "GET",
        success: result => {
            console.log(result);
        }
    })
    $("#getFit").html(`
    <form action="/add" method="post">
        <label for="exerciseName">Name of Exercise</label>
        <input type="text" name="exerciseName" value="" placeholder="Exercise">
        <label for="exerciseReps">Number of Reps</label>
        <input type="number" name="exerciseReps" value="" placeholder="# of Reps">
        <button class="btn btn-primary" id="addExercise">Add to Workout</button>
    </form>
    `);
});

$("#newWorkout").click(() => {
    $("#getFit").html(`
    <form action="/submit" method="post">
        <label for="workoutName">Name of Workout Routine</label>
        <input type="text" name="workoutName" value="" placeholder="Workout Title">
        <button class="btn btn-primary" id="createWorkout">Submit</button>
    </form>
    `);
    $("#createWorkout").click((event) => {
        event.preventDefault();
        $.ajax({
            url: "/submit",
            data: {name: $("input[name*='workoutName']").val()},
            method: "POST",
            success: result => {
                console.log(result);
            }
        })
    })
});

