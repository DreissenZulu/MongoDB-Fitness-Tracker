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
                $("#getFit").html(`
                <h2>Add Exercise to ${$(event.currentTarget).text()}</h2>
                <form action="/add" method="post">
                    <label for="exerciseName">Name of Exercise</label>
                    <input type="text" name="exerciseName" value="" placeholder="Exercise">
                    <label for="exerciseReps">Number of Reps</label>
                    <input type="number" name="exerciseReps" value="" placeholder="# of Reps">
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
                            console.log(result);
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

