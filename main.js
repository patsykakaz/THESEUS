
// pardon my javascript. i am a software law student and have started learning this language pretty recently...

// Problem if mouse is exploring a new path after reaching the 
// cheese. Should she have to rewind on her own tracks before even reaching 
//  a known path, she will be taken in an infinite loop for she will not make 
// any difference between an exploration vector and a standard memorized vector 
// from the init. search (neurosis)





function explorationStrategy(maze, position){
	// if previous vector in current square 
	// -> mouse adds 90° and try for obstacle only
	if(maze[position][2] != 0){
		direction = quadrant(maze[position][2] + 1);
		attempt = 4;
	}
	else{
		direction = 3;
		attempt = 0;
	}
	obstacleTest(maze, position, direction, attempt);
}

function goalStrategy(maze, position){
	memorizedVector = maze[position][2];
	obstacles = maze[position][1];
	if(memorizedVector == 0){
		// unvisited square: direction = South, attempt = 0
		obstacleTest(maze, position, 3, 0);
	}
	else{
		if(obstacles.indexOf(memorizedVector) == -1){
			// memorized vector's way is open -> take path
			moveThisWay(maze,position,memorizedVector,goalStrategy);
		}
		else{
			// mouse bumps into unexpected wall
			obstacleTest(maze, position, memorizedVector, 4)
		}
	}
}

function obstacleTest(maze, position, direction, attempt){
	switch(direction){
		case 1:
			nextPosition = position + 5;
		break;

		case 2:
			nextPosition =  position + 1;
		break;

		case 3:
			nextPosition = position - 5;
		break;

		case 4:
			nextPosition = position - 1;
		break;
	}
	aimedSquare = maze[nextPosition];
	// in case the mouse is on a edge of the maze		
	if(strategy == explorationStrategy){
		if(typeof(aimedSquare) != 'undefined'){
			// check for a wall in the current direction
			if(maze[position][1].indexOf(direction) == -1){
				if(attempt < 4){			
					// check for a previous vector left in the targeted square
					if(aimedSquare[2] == 0){
						// mouse moves forward
						moveThisWay(maze,position,direction, strategy);
					}
					else{
						// mouse refuses to move in previously visited square
						obstacleTest(maze, position,quadrant(direction+1),attempt+1);
					}
				}
				else{
					// mouse moves forward despite any previous vector
					moveThisWay(maze,position,direction, strategy);
				}
			}
			else{
				// mouse hits an obstacle
				testThisWay(maze,position,direction,attempt);
			}
		}
		else{
			// mouse on an edge
			testThisWay(maze,position,direction,attempt);
		}
	}
	else if(strategy = goalStrategy){
		if(typeof(aimedSquare) != 'undefined'){
			// check for a wall in the current direction
			if(maze[position][1].indexOf(direction) == -1){
				if(attempt < 4){
					// check for a previous vector left in the targeted square
					if(aimedSquare[2] == 0){
						// mouse moves forward
						moveThisWay(maze,position,direction, strategy);
					}
					else{
						// mouse refuses to move in previously visited square
						obstacleTest(maze, position,quadrant(direction+1),attempt+1);
					}
				}
				else{
					// mouse moves forward despite any previous vector
					moveThisWay(maze,position,direction, strategy);
				}
			}
			else{
				// mouse hits an obstacle
				testThisWay(maze,position,direction,attempt);
			}
		}
		else{
			// mouse on an edge
			testThisWay(maze,position,direction,attempt);
		}	
	}
}

function unexpectedObstacle(maze, position){
	//
	testThisWay()
}



function testThisWay(maze, position, direction, attempt){
	mouse = $('#mouse');
	switch(direction){
			case 1:
				mouse
					.removeClass('fa-rotate-0 fa-rotate-90')
					.removeClass('fa-rotate-180 fa-rotate-270')
					.addClass('fa-rotate-0')
					.animate({ top: "-=38" }, 200 )
					.animate({ top: "+=38" }, 200 );
			break;
			
			case 2:
				mouse
					.removeClass('fa-rotate-0 fa-rotate-90')
					.removeClass('fa-rotate-180 fa-rotate-270')
					.addClass('fa-rotate-90')
					.animate({ left: "+=38" }, 200 )
					.animate({ left: "-=38" }, 200 );
			break;
			
			case 3:
				mouse
					.removeClass('fa-rotate-0 fa-rotate-90')
					.removeClass('fa-rotate-180 fa-rotate-270')
					.addClass('fa-rotate-180')
					.animate({ top: "+=38" }, 200 )
					.animate({ top: "-=38" }, 200 );
			break;
			
			case 4:
				mouse
					.removeClass('fa-rotate-0 fa-rotate-90')
					.removeClass('fa-rotate-180 fa-rotate-270')
					.addClass('fa-rotate-270')
					.animate({ left: "-=38" }, 200 )
					.animate({ left: "+=38" }, 200 );
			break;
	}
	setTimeout(function(){
		// callback for obstacleTest
		obstacleTest(maze, position, quadrant(direction+1), attempt+1);
	},400);
}



function moveThisWay(maze, position, direction, callback){
	mouse = $('#mouse');
	setTimeout(function(){
		if(maze[position][3] == true){
			cheeseEnd();
		}
		else{
			// callback explorationStrategy
			callback(maze, position);
		}
	},700);
	maze[position][2] = direction;
	switch(direction){
		case 1:
			mouse
				.removeClass('fa-rotate-0 fa-rotate-90')
				.removeClass('fa-rotate-180 fa-rotate-270')
				.addClass('fa-rotate-0')
				.animate({ top: "-=100" }, 400 );
			position += 5;
			direction = 1;
		break;

		case 2:
			mouse
				.removeClass('fa-rotate-0 fa-rotate-90')
				.removeClass('fa-rotate-180 fa-rotate-270')
				.addClass('fa-rotate-90')
				.animate({ left: "+=100" }, 400 );
			position += 1;
			direction = 2;
		break;

		case 3:
			mouse
				.removeClass('fa-rotate-0 fa-rotate-90')
				.removeClass('fa-rotate-180 fa-rotate-270')
				.addClass('fa-rotate-180')
				.animate({ top: "+=100" }, 400 );
			position -= 5;
			direction = 3;
		break;

		case 4:
			mouse
				.removeClass('fa-rotate-0 fa-rotate-90')
				.removeClass('fa-rotate-180 fa-rotate-270')
				.addClass('fa-rotate-270')
				.animate({ left: "-=100" }, 400 );
			position -= 1;
			direction = 4;
		break;

		default:
			alert('moveThisWay direction ERROR');
	}
	vectorsToHtml(maze);
}


































function cheeseEnd(callback){
	setTimeout(function(){
		$('.fa-trophy').css('color', 'rgb(100,100,120');
		// alert('CHEESE !');
	},200);
	strategy = goalStrategy;
	$('#intBtn').removeClass('disabled');
}












function quadrant(direction){
	if(direction > 4){
		direction -= 4;
	}
	return direction;
}











function mazeToHtml(maze){
	ligne = 5;
	while(ligne){	
		i = -5;
		while(i < 0){
			squareNumber = (ligne * 5) + i;
			obstacles = '';
			if(maze[squareNumber][1].indexOf(1) != -1){
				obstacles += ' obstacleNorth';
			}
			if(maze[squareNumber][1].indexOf(2) != -1){
				obstacles += ' obstacleEast';
			}
			if(maze[squareNumber][1].indexOf(3) != -1){
				obstacles += ' obstacleSouth';
			}
			if(maze[squareNumber][1].indexOf(4) != -1){
				obstacles += ' obstacleWest';
			}
			if(maze[squareNumber][2] == true){
				obstacles += ' cheese';
			}
			i += 1;
			cheese = '';
			if(maze[squareNumber][3] == true){
				cheese += 'fa-trophy red';
			}	
			$('#maze').append(
					'<div id=\'square' +(squareNumber+1)+ 
					'\' class=\'square ' +obstacles+ 
					'\'><div class=\'innerSquare\'><i class=\'fa ' 
					+cheese+ ' \'></i></div></div>'
				);
			$('#intLayer').append(
					'<div class=\'intSquare\' rel=\'' 
					+(squareNumber+1)+ '\'>' +(squareNumber+1)+ '</div>'
				);
		} 
		ligne -= 1;
	}
}

function vectorsToHtml(maze){
	for(var i = 1; i < 26; i++){
		squareTarget = '#square' + i;
		memoryVector = maze[i-1][2];
		vectorTarget = $(squareTarget).find('.innerSquare .fa');
		classToRemove = 'fa-long-arrow-up fa-long-arrow-righ' + 
						'fa-long-arrow-down fa-long-arrow-left';
		switch(memoryVector){
			case 0:
				// vector stays .hidden
			break;

			case 1:
				vectorTarget
				.removeClass(classToRemove)
				.addClass('fa-long-arrow-up');
			break;

			case 2:
				vectorTarget
				.removeClass(classToRemove)
				.addClass('fa-long-arrow-right');
			break;

			case 3:
				vectorTarget
				.removeClass(classToRemove)
				.addClass('fa-long-arrow-down');
			break;

			case 4:
				vectorTarget
				.removeClass(classToRemove)
				.addClass('fa-long-arrow-left');
			break;
		}		
	};
}
