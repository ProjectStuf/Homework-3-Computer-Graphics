
#version 330 core
layout (location = 0) in vec3 position;
layout (location = 1) in vec3 normal;

out vec3 Normal;
out vec3 FragPos;

uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;

void main()
{
    // Transform the vertex position to world space
    FragPos = vec3(model * vec4(position, 1.0));

    // Transform the normal to world space and normalize it
    Normal = mat3(transpose(inverse(model))) * normal;

    // Compute the final position of the vertex in clip space
    gl_Position = projection * view * model * vec4(position, 1.0);
} 