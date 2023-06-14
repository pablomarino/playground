from math import ceil,floor,sin,cos,pi
from random import random

class grid:
    def __init__(self, grid_size:int, stage_width:int, stage_height:int, radius:float, rand:float)->None:
        self.grid_size = grid_size
        self.stage_width = stage_width
        self.stage_height = stage_height
        self.center_radius = self.grid_size*radius
        self.rand = rand
        self.rows =  ceil(self.stage_height / self.grid_size )
        self.columns = ceil(self.stage_width / self.grid_size)

        #
        self.grid_halfwidth = round(grid_size/2)
        self.grid_halfheight = round(grid_size/2)
        # Desplazamiento del grid para que se alinee al centro de la pantalla
        self.grid_displacement_x = round((self.stage_width - self.grid_size * self.columns)/2)
        self.grid_displacement_y = round((self.stage_height - self.grid_size * self.rows)/2)
        # Matriz  bidimensional que contiene los puntos centrales de cada celda
        self.points = []
        self.circles = []

        for i in range (0,self.rows):
            self.points.append([])
            for j in range (0,self.columns):
                random_x = floor(self.rand * (random()*self.grid_size-self.grid_halfwidth))
                random_y = floor(self.rand * (random()*self.grid_size-self.grid_halfheight))
                # Centro de la celda i,j
                center = Point((j*self.grid_size+self.grid_halfwidth+random_x+self.grid_displacement_x , i*self.grid_size+self.grid_halfheight+random_y+self.grid_displacement_y))
                self.points[i].append(center)

                # 
                circle = Circle(center,self.center_radius)
                self.circles.append(circle)

        for i in range (0,self.rows):
            for j in range (0,self.columns):
                if(i>0 and  j>0):
                    self.points[i][j].neighboors.append(self.points[i-1][j-1])
                if(i>0):
                    self.points[i][j].neighboors.append(self.points[i-1][j])
                if(i>0 and j<self.columns-1):
                    self.points[i][j].neighboors.append(self.points[i-1][j+1])
                if(j>0):
                    self.points[i][j].neighboors.append(self.points[i][j-1])
                if(j<self.columns-1):
                    self.points[i][j].neighboors.append(self.points[i][j+1])
                if(i<self.rows-1 and j>0):
                    self.points[i][j].neighboors.append(self.points[i+1][j-1])
                if(i<self.rows-1):
                    self.points[i][j].neighboors.append(self.points[i+1][j])
                if(i<self.rows-1 and j<self.columns-1):
                    self.points[i][j].neighboors.append(self.points[i+1][j+1])
                

    def getPoints(self):
        return self.points

    def getCircles(self):
        return self.circles

class Point:
    def __init__(self,pixel_position,):
        self.pixel_position = pixel_position
        self.neighboors = []
        self.circle = None

    def getPosition(self):
        return self.pixel_position
    
    def getCircle(self):
        return self.circle

class Circle:
    def __init__(self,center_point,radius):
        self.center_point = center_point
        self.center_point.circle = self
        self.radius = radius
        self.rotation_speed = random()*2-1
        self.phase = random()*2*pi

    def getSurfacePoint(self,time):
        p = (
            round(self.center_point.getPosition()[0]+self.radius*cos(self.phase+time*self.rotation_speed)),
            round(self.center_point.getPosition()[1]+self.radius*sin(self.phase+time*self.rotation_speed))
            )
        return p

    def getNeighboors(self):
        return self.center_point.neighboors

    def getCenterPoint(self):
        return self.center_point