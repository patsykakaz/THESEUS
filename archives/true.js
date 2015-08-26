

function explorationStrategy(maze, mouse, initPosition, initDirection){
	memorizedMaze = [
		[1,0],
		[2,0],
		[3,0],
		[4,0],
		[5,0],
		
		[6,0],
		[7,0],
		[8,0],
		[9,0],
		[10,0],
		
		[11,0],
		[12,0],
		[13,0],
		[14,0],
		[15,0],
		
		[16,0],
		[17,0],
		[18,0],
		[19,0],
		[20,0],
		
		[21,0],
		[22,0],
		[23,0],
		[24,0],
		[25,0],
	];

	goal = false;
	// useless mais plus clair pour le moment
	position = initPosition;
	direction = initDirection;

	while(!goal){
		alert(position);
		square = maze[position-1];
		// init square exploration
		yieldArray = explorationDispatch(maze, memorizedMaze, mouse, position, direction);
		// retour de la nouvelle position et de la nouvelle direction et du goalMarker
		position = yieldArray[0];
		direction = yieldArray[1];
		// add last direction taken by the mouse to its memorizerd maze
		memorizedMaze[position -1][1] = direction;
		// check for Goal
		if(maze[position -1][2] == true){
			goal = true;
			alert('GOAL REACHED !!');
		}
	}
	mazeToDisplay = '';
	for (var i = 0; i < memorizedMaze.length; i++) {
		mazeToDisplay += 'square : ' + memorizedMaze[i][0] + ' // direction : ' + memorizedMaze[i][1] + '-----       ';
	};
	alert(mazeToDisplay);
	// switch to goalStrategy
}

function explorationDispatch(maze, memorizedMaze, mouse, mousePosition, mouseDirection){
	fwd = false;
	mouseState = [];

	while(!fwd){
		switch(mouseDirection){
			case 1:
				mouseState = squareExploration(maze, memorizedMaze, mouse, mousePosition, 4, 1, 2);
			break;

			case 2:
				mouseState = squareExploration(maze, memorizedMaze, mouse, mousePosition, 1, 3, 2);
			break;

			case 3:
				mouseState = squareExploration(maze, memorizedMaze, mouse, mousePosition, 3, 4, 2);
			break;

			case 4:
				mouseState = squareExploration(maze, memorizedMaze, mouse, mousePosition, 3, 4, 1);
			break;

			default:
				alert('explorationDispatch ERROR');
		}
		fwd = true;
		mousePosition = mouseState[0];
		mouseDirection = mouseState[1];
	}
	// return new mousePosition & new mouseDirection
	return [newPosition, newDirection];
}

function squareExploration(maze, memorizedMaze, mouse, mousePosition, direction1, direction2, direction3){
	firstAttempt = true;
	exit = false;
	// first loop checks for any obstacle free path leeding to a anti-direction free square
	while(firstAttempt && !exit){
		alert('trying to go ' + convertDirection(direction1));
		obstacleYield = tryDirection(maze, memorizedMaze, mouse, mousePosition, direction1);
		if(!obstacleYield[0] && !obstacleYield[1]){
			memorizedMaze[mousePosition-1][1] = direction1;
			newPosition = addDirection(mousePosition, direction1);
			newDirection = direction1;
			exit = true;
		}
		else{
			alert('Now trying to go ' + convertDirection(direction2));
			obstacleYield = tryDirection(maze, memorizedMaze, mouse, mousePosition, direction2);
			if(!obstacleYield[0] && !obstacleYield[1]){
				memorizedMaze[mousePosition-1][1] = direction2;
				newPosition = addDirection(mousePosition, direction2);
				newDirection = direction2;
				exit = true;
			}
			else{
				alert('Now trying to go ' + convertDirection(direction3));
				obstacleYield = tryDirection(maze, memorizedMaze, mouse, mousePosition, direction3);
				if(!obstacleYield[0] && !obstacleYield[1]){
					memorizedMaze[mousePosition-1][1] = direction3;
					newPosition = addDirection(mousePosition, direction3);
					newDirection = direction3;
					exit = true;
				}
				else{
					firstAttempt = false;
				}
			}
		}
	}
	// second loop only checks for an obstacle free path
	while(!exit){
		alert('second loop starting');
		obstacleYield = tryDirection(maze, memorizedMaze, mouse, mousePosition, direction1);
		if(!obstacleYield[0]){
			memorizedMaze[mousePosition-1][1] = direction1;
			newPosition = addDirection(mousePosition, direction1);
			newDirection = direction1;
			exit = true;
		}
		else{
			obstacleYield = tryDirection(maze, memorizedMaze, mouse, mousePosition, direction2);
			if(!obstacleYield[0]){
				memorizedMaze[mousePosition-1][1] = direction2;
				newPosition = addDirection(mousePosition, direction2);
				newDirection = direction2;
				exit = true;
			}
			else{
				obstacleYield = tryDirection(maze, memorizedMaze, mouse, mousePosition, direction3);
				if(!obstacleYield[0]){
					memorizedMaze[mousePosition-1][1] = direction3;
					newPosition = addDirection(mousePosition, direction3);
					newDirection = direction3;
					exit = true;
				}
				else{			
					reverseDirection = quadrant(direction + 2);	
					obstacleYield = tryDirection(maze, memorizedMaze, mouse, mousePosition, reverseDirection);
					if(!obstacleYield[0]){
						memorizedMaze[mousePosition-1][1] = reverseDirection;
						newPosition = addDirection(mousePosition, reverseDirection);
						newDirection = reverseDirection;
						exit = true;
					}
					else{
						alert('Mouse must be blocked !!!');
					}				
				}
			}
		}
	}
	// return newPosition
	return [newPosition, newDirection];
}

function tryDirection(maze, memorizedMaze, mouse, mousePosition, mouseDirection){
	obstacle = false;
	previousVector = false;
	if(maze[mousePosition-1][1].indexOf(mouseDirection) != -1){
		alert('obstacle in the ' + convertDirection(mouseDirection) + ' in square #' + mousePosition);
		obstacle = true;
	}
	nextPosition = addDirection(mousePosition, mouseDirection);
	if(memorizedMaze[nextPosition-1] >= 0 && memorizedMaze[nextPosition-1] < 26){
		if(memorizedMaze[nextPosition-1].indexOf(quadrant(mouseDirection)) != -1){
			alert('wrong vector in square #' + nextPosition + ' by ' + convertDirection(mouseDirection) + ' direction');
			previousVector = true;
		}
	}
	return [obstacle, previousVector];
}


function addDirection(position, direction){
	switch(direction){
		case 1:
			position = position + 5;
		break;
		case 2:
			position = position + 1;
		break;

		case 3:
			position = position - 5;
		break;

		case 4:
			position = position - 1;
		break;

		default:
			alert('"addDirection" Direction ERROR');
	}
	return position;
}


function convertDirection(direction){
	switch(direction){
		case 1:
			return 'North';
		break;

		case 2:
			return 'East';
		break;

		case 3:
			return 'South';
		break;

		case 4: 
			return 'West';
		break

		default:
			return 'Direction Error';
	}
}


function quadrant(direction){
	if(direction > 4){
		direction -= 4;
	}
	return direction;
}



