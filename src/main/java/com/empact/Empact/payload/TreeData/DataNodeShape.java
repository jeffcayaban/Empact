package com.empact.Empact.payload.TreeData;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * A data object that describes the details necessary to render the node on the data visualisation.
 */

@Data
@AllArgsConstructor
public class DataNodeShape {

	/** The shape that the node will be displayed. **/
	private String shape;

	/** The properties that will be used to render the shape. **/
	private DataNodeShapeProps shapeProps;
}
