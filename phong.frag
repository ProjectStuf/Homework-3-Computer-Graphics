
#version 330 core
out vec4 color;

in vec3 FragPos;  
in vec3 Normal;  

uniform vec3 lightPos; 
uniform vec3 viewPos;
uniform vec3 lightColor;
uniform vec3 objectColor;

void main()
{
    // Normalize input normal
    vec3 norm = normalize(Normal);
    
    // Compute light direction
    vec3 lightDir = normalize(lightPos - FragPos);
    
    // Compute diffuse shading using Lambert's cosine law
    float diff = max(dot(norm, lightDir), 0.0);
    
    // Compute view direction and reflect direction for specular lighting
    vec3 viewDir = normalize(viewPos - FragPos);
    vec3 reflectDir = reflect(-lightDir, norm);
    
    // Compute specular component using Blinn-Phong model
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32);
    
    // Combine ambient, diffuse, and specular components
    vec3 ambient = 0.1 * lightColor;
    vec3 diffuse = diff * lightColor;
    vec3 specular = spec * lightColor;
    
    vec3 result = (ambient + diffuse + specular) * objectColor;
    
    color = vec4(result, 1.0);
} 