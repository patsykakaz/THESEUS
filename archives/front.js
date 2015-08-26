

function explorationStrategy(maze, initPosition, initDirection){
	knownMaze = [
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
		square = maze[position-1];

		alert('position : ' + position + ' // direction :' + convertDirection(direction));
		// init square exploration
		yieldArray = squareExploration(square, position, 3);
		// if goal -> break;
		// ajout de la direction au knownMaze
		knownMaze[position -1][1] = yieldArray[1]
		// retour de la nouvelle position et de la nouvelle direction et du goalMarker
		position = yieldArray[0];
		direction = yieldArray[1];
		if(maze[position -1][2] == true){
			goal = true;
			alert('GOAL REACHED !!');
		}
	}
	mazeToDisplay = '';
	for (var i = 0; i < knownMaze.length; i++) {
		mazeToDisplay += 'square : ' + knownMaze[i][0] + ' // direction : ' + knownMaze[i][1] + '-----       ';
	};
	alert(mazeToDisplay);
	// switch to goalStrategy
}

function squareExploration(square, index, direction){
	fwd = false;

	while(!fwd){
		directionTry = rotate(direction, 0);
		if(square[1].indexOf(directionTry) == -1){
			newPosition = moveThisWay(index,directionTry);
			newDirection = directionTry;
			fwd = true;
		}
		else{
			alert('obstacle on the ' + convertDirection(directionTry) + ' side');
			directionTry = rotate(direction, 1);
			if(square[1].indexOf(directionTry) == -1){
				newPosition = moveThisWay(index,directionTry);
				newDirection = directionTry;
				fwd = true;
			}
			else{
				alert('obstacle on the ' + convertDirection(directionTry) + ' side');
				directionTry = rotate(direction, 0);
				if(square[1].indexOf(direction) == -1){
					newPosition = moveThisWay(index,direction);
					newDirection = direction;
					fwd = true;
				}
				else{
					alert('obstacle on the ' + convertDirection(direction) + ' side');
					directionTry = rotate(direction, 2);
					if(square[1].indexOf(directionTry) == -1){
						newPosition = moveThisWay(index,directionTry);
						newDirection = directionTry;
						fwd = true;
					}
					else{
						alert('obstacle (4)');
						// prévoir une boucle infinie (comme dans la video AT&T)
					}
				}
			}
		}
	}
	// retourner la nouvelle position, la nouvelle direction (pas le goalMarker, qu'on déduit après)
	return [newPosition, newDirection];
}

function moveThisWay(index, direction){
	switch(direction){
		case 1:
			index += 5;
		break;

		case 2:
			index += 1;
		break;

		case 3:
			index -= 5;
		break;

		case 4:
			index -= 1;
		break;

		default:
			alert('Direction Error');
	}
	alert('moving to square : #' + index);
	return index;
}

function rotate(direction, rotation){
	direction = direction + rotation;
	if(direction < 1){
		direction = 4 + direction;
	}
	else if(direction > 4){
		direction = direction - 4;
	}
	alert('rotating to :' + convertDirection(direction) + ' direction');
	return direction;
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









