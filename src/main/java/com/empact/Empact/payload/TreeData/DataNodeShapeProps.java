package com.empact.Empact.payload.TreeData;

import lombok.Data;

/**
 * The properties that will be used to render the shape.
 */

@Data
public class DataNodeShapeProps {

	/** The width of the data node **/
	private Integer width;

	/** The height of the data node **/
	private Integer height;

	/** The x-axis positioning of the data node **/
	private Double x;

	/** The y-axis positioning of the data node **/
	private Double y;

	/** The colour of the data node. **/
	private String fill;
}
