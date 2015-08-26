


// mouse = [DomObject, position, direction, memorizedMaze, directionWheel];

// function Theseus(maze, mouse){


	// 1st level function
	function explorationStrategy(maze, mouse){
		goal = false;
		wheel = 3;

		while(!goal){
			// checking for directionWheel rotation (+90°) due to previous vector memorized in current square		
			if(mouse[3][mouse[1]-1][1] != 0){
				mouse[4] = quadrant(mouse[4] + 1);
			}
			else{
				mouse[4] = 3;
			}
			squareExploration(maze, mouse);
		}
	}

		// 2nd level function 
		function squareExploration(maze, mouse){
			position = mouse[1];
			reverseDirection = quadrant(mouse[2] + 2);
			memorizedMaze = mouse[3];	
			wheelDirection = mouse[4];

			alert('Mouse is in square #' +position+ ' \n facing the ' +convertDirection(quadrant(mouse[2]))+ '\n the wheel is locked on ' +convertDirection(wheelDirection));

			exit = false;
			attempt = 0;
			direction = wheelDirection;
			while(!exit){
				if(attempt < 4){
					alert('Testing for obstacle and previous vector in the : ' + convertDirection(direction));
					openWay = fullDirectionTest(maze, mouse, direction);
				}
				else{
					alert('Now testing for obstacle (only) in the : ' + convertDirection(direction));
					openWay = obstacleTest(maze, position, direction);
				}
				if(openWay){
					alert('mouse moving towards ' +convertDirection(direction));
					mouse = moveThisWay(mouse, direction);
					exit = true;
				}
				else{
					direction = quadrant(direction+1);
					attempt += 1;
				}
			}
			return mouse;
		}

			// 3rd level functions
			function fullDirectionTest(maze, mouse, direction){
				position = mouse[1];
				memorizedMaze = mouse[3];
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
				aimedSquare = memorizedMaze[nextPosition-1];
				if(typeof(aimedSquare) !='undefined'){
					if(aimedSquare[1] == 0 && maze[position-1][1].indexOf(direction) == -1){
						return true;
					}
					else{
						return false;
					}
				}
				else{
					alert('mouse is on a edge of the maze');
					return false
				}
			}
			function obstacleTest(maze, position, direction){
				if(maze[position-1][1].indexOf(direction) == -1){
					return true;
				}
				else{
					return false;
				}
			}
			function moveThisWay(mouse, direction){
				switch(direction){
					case 1:
						mouse[3][mouse[1]-1][1] = 1;
						mouse[1] += 5;
						mouse[2] = 1;
					break;

					case 2:
						mouse[3][mouse[1]-1][1] = 2;
						mouse[1] += 1;
						mouse[2] = 2;
					break;

					case 3:
						mouse[3][mouse[1]-1][1] = 3;
						mouse[1] -= 5;
						mouse[2] = 3;
					break;

					case 4:
						mouse[3][mouse[1]-1][1] = 4;
						mouse[1] -= 1;
						mouse[2] = 4;
					break;

					default:
						alert('moveThisWay direction ERROR');
				}
			}
			function quadrant(direction){
				if(direction > 4){
					direction -= 4;
				}
				return direction;
			}



//
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











	// function goalStrategy(){}
// }