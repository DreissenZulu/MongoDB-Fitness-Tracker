$("#loadWorkout").click(() => {
    $("#getFit").html(`
    
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

