import sys,pygame
from pygame.locals import *
from grid.grid import grid;

screen_resolution = (800,600)
grid_size = 64
grid_speed = 150/(grid_size * grid_size)

def setupgrid(screen):
        my_grid = grid(grid_size,screen_resolution[0],screen_resolution[1],0.2,0.0)
        grid_points = my_grid.getPoints()
        circles = my_grid.getCircles()
        return circles
        

def updategrid(screen,delta_time,circles):
        for i in range(0,len(circles)):
                p = circles[i].getSurfacePoint(delta_time)
                n = circles[i].getNeighboors()
                for j in range(0,len(n)):
                        pygame.draw.line(screen,(255-i%255,255-i%255,i%255),p,n[j].getCircle().getSurfacePoint(delta_time),1)
                #pygame.draw.circle(screen,(128,128,255),p,1)

def main():
        delta_time =1
        pygame.init()
        screen = pygame.display.set_mode(screen_resolution,0,32)
        pygame.display.set_caption("Pulsating grid")
        circles = setupgrid(screen)
        while True:
                for event in pygame.event.get():
                        if event.type==QUIT:
                                pygame.quit()
                                sys.exit()
                
                screen.fill((0, 0, 0)) 
                delta_time += grid_speed
                updategrid(screen,delta_time,circles)
                pygame.display.update()


main()

        